const fs = require('fs');
const pdf = require('pdf-parse');

async function test() {
    console.log('pdf keys:', Object.keys(pdf));
    const buffer = Buffer.from([0]); // Dummy buffer

    try {
        console.log('Attempting new pdf.PDFParse()...');
        const parser = new pdf.PDFParse();
        console.log('Parser instantiated successfully');
        // If it reaches here, we know it needs 'new'
    } catch (e) {
        console.error('Failed to instantiate with new:', e.message);
    }

    try {
        console.log('Attempting pdf.PDFParse(buffer) as function...');
        await pdf.PDFParse(buffer);
    } catch (e) {
        console.error('Failed to call as function:', e.message);
    }
}

test();
