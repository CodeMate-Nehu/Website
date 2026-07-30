import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'testimonials.json');

  if (req.method === 'GET') {
    try {
      if (!fs.existsSync(filePath)) {
        return res.status(200).json({ testimonials: [] });
      }
      const fileData = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileData);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to read testimonials' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { author, testimonial, role } = req.body || {};
      if (!author || !testimonial) {
        return res.status(400).json({ error: 'Author name and testimonial text are required.' });
      }

      let data = { testimonials: [] };
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(fileData);
      }

      const newEntry = {
        author: author.trim(),
        testimonial: testimonial.trim(),
        role: role && role.trim() ? role.trim() : 'CodeMate Member'
      };

      data.testimonials.push(newEntry);

      fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');

      return res.status(200).json({
        success: true,
        message: 'Testimonial added successfully!',
        testimonials: data.testimonials
      });
    } catch (err) {
      console.error('API Error writing testimonial:', err);
      return res.status(500).json({ error: 'Failed to save testimonial' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
