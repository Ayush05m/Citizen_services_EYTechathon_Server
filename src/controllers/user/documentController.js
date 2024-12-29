export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const document = new Document({
            user: req.userId,
            type: req.body.type,
            url: `/uploads/${req.file.filename}`,
        });

        await document.save();

        // Add document reference to user
        await User.findByIdAndUpdate(req.userId, {
            $push: { documents: document._id }
        });

        res.status(201).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading document' });
    }
};

export const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ user: req.userId });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents' });
    }
}

export const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document' });
    }
}

export const deleteDocument = async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document' });
    }
}

export const verifyDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        document.status = 'verified';
        document.verificationDetails = {
            verifiedAt: new Date(),
            verifiedBy: 'AI System',
            comments: 'Document verified successfully'
        };
        await document.save();
        res.json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error verifying document' });
    }
}
