const pdf = require('pdf-parse');
console.log('Type of pdf:', typeof pdf);
console.log('Contents of pdf:', pdf);

const mockBuffer = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Title (Test) >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF');

try {
    const pdfParser = typeof pdf === 'function' ? pdf : pdf.default;
    console.log('Selected pdfParser type:', typeof pdfParser);

    if (typeof pdfParser === 'function') {
        pdfParser(mockBuffer).then(() => {
            console.log('Successfully called pdfParser with mock buffer');
        }).catch(err => {
            console.log('Caught expected error from invalid PDF buffer:', err.message);
        });
    } else {
        console.log('pdfParser is NOT a function');
    }
} catch (e) {
    console.error('Error in test script:', e);
}
