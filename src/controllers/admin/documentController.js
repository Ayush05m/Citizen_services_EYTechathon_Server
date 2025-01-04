import Document from "../../models/Document.js";

export const getAllDocuments = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const documents = await Document.find()
        .select('-password')
        .populate('documents')
        .skip(skip)
        .limit(limit)
        .sort('-createdAt');

    const total = await Document.countDocuments();

    res.json({
        message: "Success",
        data: {
            documents,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        }
    });

}

export const getAllDocumentsCount = async (req, res) => {
    try {
        const documentCount = await Document.countDocuments();
        res.json({ message: "Success", data: { count: documentCount } });
    }
    catch {
        res.status(500).json({ message: 'Error fetching users count' });
    }
}