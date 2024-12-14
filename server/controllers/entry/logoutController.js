
exports.logoutUser = async (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).send({ message: 'Logged out successfully' });
}