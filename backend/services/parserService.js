const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Extract text from a buffer containing PDF data
 * @param {Buffer} buffer 
 * @returns {Promise<string>}
 */
const extractTextFromPDF = async (buffer) => {
    try {
        if (!buffer || buffer.length === 0) {
            throw new Error('PDF buffer is empty');
        }

        // For pdf-parse v2, we must use the PDFParse class with 'new'
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();

        // Important: Always destroy the parser to free up memory (it uses a worker)
        await parser.destroy();

        if (!result || !result.text) {
            throw new Error('No text found in PDF. Is it a scanned image?');
        }

        return result.text;
    } catch (error) {
        console.error('Detailed PDF Parsing Error:', error);
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
};

/**
 * Extract text from a buffer containing Docx data
 * @param {Buffer} buffer 
 * @returns {Promise<string>}
 */
const extractTextFromDocx = async (buffer) => {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } catch (error) {
        console.error('Error extracting text from Docx:', error);
        throw new Error('Failed to parse Docx file');
    }
};

module.exports = {
    extractTextFromPDF,
    extractTextFromDocx
};
