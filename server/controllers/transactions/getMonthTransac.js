const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize} = require('sequelize')

exports.getMonthTransac = async (req, res) => {
    const { usrId } = req.user;
    let query = req.query;
    let queryParams = Object.keys(query); // Use Object.keys to get the query parameters

    // Build date parameters based on the query keys
    const dateParams = queryParams.map(queryParam =>
        Sequelize.where(
            Sequelize.fn('EXTRACT', Sequelize.literal(`${queryParam.toUpperCase()} FROM "date"`)),
            { [Op.eq]: parseInt(query[queryParam], 10) } // Convert string values to integers
        )
    );

    try {
        const monthTransac = await Transaction.findAll({
            where: {
                user_id: usrId,
                [Op.and]: dateParams
            }
        });

        // Return the found transactions
        if (monthTransac.length === 0) {
            return res.status(404).json({ message: 'No transactions found' });
        }

        return res.status(200).json(monthTransac);
    } catch (err) {
        console.error('Error fetching transactions:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
