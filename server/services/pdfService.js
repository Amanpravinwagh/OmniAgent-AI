const pdfParse = require('pdf-parse');

/**
 * Parse PDF Buffer and extract text content
 * @param {Buffer} fileBuffer - In-memory PDF file buffer from Multer
 */
const parsePdfDocument = async (fileBuffer) => {
  try {
    const parsedData = await pdfParse(fileBuffer);
    
    // Clean up extra whitespace and newlines
    const cleanedText = parsedData.text.replace(/\s+/g, ' ').trim();
    
    return {
      success: true,
      pages: parsedData.numpages,
      text: cleanedText,
      summaryExcerpt: cleanedText.slice(0, 1000),
    };
  } catch (error) {
    console.error('PDF Parsing Service Error:', error.message);
    return {
      success: false,
      error: 'Failed to process PDF buffer.',
    };
  }
};

module.exports = { parsePdfDocument };