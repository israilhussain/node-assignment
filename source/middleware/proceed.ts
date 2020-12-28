const proceed = (req: { status?: any; session?: any; originalUrl?: any; }, res: any, next: () => any) => {
    const { session, originalUrl } = req;
    if (originalUrl.startsWith('/pub/proxy') || originalUrl.startsWith('/api/proxy')) {
        if (!session) {
            req.status = 500;
            throw new Error('Url not allowed');
        }
    }
    return next();
}

export { proceed };
