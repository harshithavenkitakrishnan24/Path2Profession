const pdf = require('pdf-parse');
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

        let resultText = '';

        if (pdf && pdf.PDFParse) {
            // pdf-parse v2+ syntax
            const parser = new pdf.PDFParse({ data: buffer });
            const result = await parser.getText();
            resultText = result.text;
            if (typeof parser.destroy === 'function') {
                await parser.destroy();
            }
        } else {
            // pdf-parse v1 syntax
            const pdfParser = typeof pdf === 'function' ? pdf : pdf.default;
            if (typeof pdfParser !== 'function') {
                throw new Error('pdf-parse library is not loaded correctly. Export structure changed.');
            }
            const result = await pdfParser(buffer);
            resultText = result.text;
        }

        if (!resultText) {
            throw new Error('No text found in PDF. Is it a scanned image?');
        }

        return resultText;
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
