class AuthMiddleware {
    basicAuth = async (req, res, next) => {
        try {
            const token = this.extractTokenFromHeader(req);

            if (!token) {
                throw new Error('Unauthorized');
            }

            const valueDecode = Buffer.from(token, 'base64').toString('ascii');
            const [username, password] = valueDecode.split(':');

            if (
                process.env.BASIC_AUTHEN_USERNAME !== username ||
                process.env.BASIC_AUTHEN_PASSWORD !== password
            ) {
                throw new Error('Unauthorized');
            }

            next();
        } catch (error) {
            console.log("🚀 ~ AuthMiddleware ~ basicAuth= ~ error:", error)
            return res.status(401).json({
                error: error.message
            });
        }
    }

    extractTokenFromHeader = (request) => {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Basic' ? token : undefined;
    }
}

module.exports = new AuthMiddleware();