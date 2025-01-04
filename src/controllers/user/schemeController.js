import Scheme from "../../models/Scheme.js";

export const getSchemesQuery = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schemes' });
    }
};

export const getSchemeById = async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching scheme' });
    }
};