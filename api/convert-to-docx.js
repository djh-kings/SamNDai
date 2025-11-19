// api/convert-to-docx.js - Convert JSON to Word Document
const { Document, Packer, Paragraph, TextRun, HeadingLevel, LevelFormat, AlignmentType } = require('docx');

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { documentData, filename } = req.body;
    
    if (!documentData) {
      return res.status(400).json({ error: 'Document data is required' });
    }
    
    // Convert JSON to docx structure
    const children = [];
    
    // Add title
    if (documentData.title) {
      children.push(
        new Paragraph({
          heading: HeadingLevel.TITLE,
          children: [new TextRun({ text: documentData.title, bold: true })],
          spacing: { after: 240 }
        })
      );
    }
    
    // Process sections
    for (const section of documentData.sections || []) {
      // Add section heading
      if (section.heading) {
        const headingLevel = section.level === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2;
        children.push(
          new Paragraph({
            heading: headingLevel,
            children: [new TextRun(section.heading)],
            spacing: { before: 240, after: 120 }
          })
        );
      }
      
      // Process content items
      for (const item of section.content || []) {
        if (item.type === 'paragraph') {
          const runs = [];
          runs.push(new TextRun({
            text: item.text,
            bold: item.bold || false,
            italics: item.italic || false
          }));
          
          children.push(
            new Paragraph({
              children: runs,
              spacing: { after: 120 }
            })
          );
        }
        
        else if (item.type === 'list') {
          const listRef = item.style === 'numbered' ? 'numbered-list' : 'bullet-list';
          
          for (const listItem of item.items || []) {
            children.push(
              new Paragraph({
                text: listItem,
                numbering: { reference: listRef, level: 0 },
                spacing: { after: 60 }
              })
            );
          }
          
          // Add spacing after list
          children.push(new Paragraph({ text: '', spacing: { after: 120 } }));
        }
        
        else if (item.type === 'checklist') {
          for (const checkItem of item.items || []) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: '☐ ' }),
                  new TextRun(checkItem.replace(/^✓\s*/, '').replace(/^☐\s*/, ''))
                ],
                spacing: { after: 60 }
              })
            );
          }
          
          // Add spacing after checklist
          children.push(new Paragraph({ text: '', spacing: { after: 120 } }));
        }
      }
    }
    
    // Create document with proper formatting
    const doc = new Document({
      styles: {
        default: {
          document: {
            run: { font: 'Arial', size: 24 } // 12pt
          }
        },
        paragraphStyles: [
          {
            id: 'Heading1',
            name: 'Heading 1',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: { size: 32, bold: true, color: '000000', font: 'Arial' },
            paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 }
          },
          {
            id: 'Heading2',
            name: 'Heading 2',
            basedOn: 'Normal',
            next: 'Normal',
            quickFormat: true,
            run: { size: 28, bold: true, color: '000000', font: 'Arial' },
            paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 1 }
          }
        ]
      },
      numbering: {
        config: [
          {
            reference: 'bullet-list',
            levels: [
              {
                level: 0,
                format: LevelFormat.BULLET,
                text: '•',
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 720, hanging: 360 }
                  }
                }
              }
            ]
          },
          {
            reference: 'numbered-list',
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: '%1.',
                alignment: AlignmentType.LEFT,
                style: {
                  paragraph: {
                    indent: { left: 720, hanging: 360 }
                  }
                }
              }
            ]
          }
        ]
      },
      sections: [
        {
          properties: {
            page: {
              margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
            }
          },
          children: children
        }
      ]
    });
    
    // Convert to buffer
    const buffer = await Packer.toBuffer(doc);
    
    // Send as downloadable file
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document.docx'}"`);
    res.send(buffer);
    
  } catch (error) {
    console.error('Error converting to docx:', error);
    return res.status(500).json({ error: error.message });
  }
}
