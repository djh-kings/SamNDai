"""
Vercel Serverless Function for Sam ND Adaptations Tool
Handles API requests to Anthropic Claude
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os

app = Flask(__name__)
CORS(app)

# Master instructions - embedded for Vercel deployment
MASTER_INSTRUCTIONS = """You are Sam, a UK expert in the education of neurodivergent pupils, focused on secondary school. You have many years' experience as a respected SENCO, hold a PGCert/PGDip in Autism, and have undertaken PDA Society training with extensive practice supporting pupils with a PDA profile.

Follow the 7-stage workflow for lesson adaptations:

STAGE 0: Intake (MANDATORY - always ask at least one question)
- Ask about completion mode (timed/homework/classroom)
- Ask about assessment stakes (formal/low-stakes/practice)
- Ask any other clarifying questions needed

STAGE 1: Analysis
- Analyse barriers through inclusion lens
- Cover: clarity & load, sensory environment, executive function, autonomy & demand, assessment access

STAGE 2: Recommendations (MANDATORY)
- Provide 6-10 specific, actionable changes
- Tag each as [Autism], [PDA], or [Both]
- Include worked examples if needed

STAGE 3: Approval Gate (HARD STOP)
- Ask: "Would you like me to generate the two student-facing versions now?"
- DO NOT proceed until explicit approval received

STAGE 4: Create Student-Facing Outputs (ONLY after approval)
- Create autism-friendly version (structure, predictability)
- Create PDA-friendly version (autonomy, choice)
- Both maintain original learning objectives

STAGE 5: Self-Check
- Review hints policy before delivery
- Ensure scaffolds format, not content

STAGE 6: Final Delivery
- Deliver as plain text formatted for Word
- Only create 2 files maximum (autism + PDA versions)
- Everything else in chat response

Remember: UK English, SEND Code of Practice, evidence-based practice."""

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint for Claude API calls"""
    try:
        data = request.get_json()
        
        if not data or 'messages' not in data:
            return jsonify({'error': 'Missing messages in request'}), 400
        
        messages = data['messages']
        
        # Get API key from environment
        api_key = os.environ.get('ANTHROPIC_API_KEY')
        
        if not api_key:
            return jsonify({'error': 'API key not configured on server'}), 500
        
        # Initialize Anthropic client
        client = anthropic.Anthropic(api_key=api_key)
        
        # Check if this is the first message
        is_first_message = len(messages) == 1
        
        if is_first_message:
            # Prepend system instructions to first user message
            system_message = f"""{MASTER_INSTRUCTIONS}

The user will now provide a lesson plan to adapt. Follow the workflow exactly:
1. Ask intake questions (MANDATORY)
2. Analyse the lesson
3. Provide recommendations
4. Wait for approval (HARD STOP)
5. Create student-facing versions (only after approval)
6. Complete delivery

Remember: Only create 2 files maximum."""
            
            messages_to_send = [{
                'role': 'user',
                'content': system_message + '\n\n' + messages[0]['content']
            }]
        else:
            messages_to_send = messages
        
        # Call Claude API
        response = client.messages.create(
            model='claude-sonnet-4-20250514',
            max_tokens=8000,
            messages=messages_to_send
        )
        
        # Return response
        return jsonify({
            'content': [{'text': response.content[0].text}],
            'usage': {
                'input_tokens': response.usage.input_tokens,
                'output_tokens': response.usage.output_tokens
            }
        })
        
    except anthropic.APIError as e:
        return jsonify({'error': f'Anthropic API error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'Sam backend is running',
        'version': '2.1'
    })

# For Vercel, we need to expose the app
def handler(request):
    """Vercel serverless handler"""
    with app.request_context(request.environ):
        try:
            response = app.full_dispatch_request()
            return response
        except Exception as e:
            return jsonify({'error': str(e)}), 500
