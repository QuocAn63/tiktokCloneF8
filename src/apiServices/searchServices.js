import * as request from '~/utils/request';

export const search = async (key, type = 'less') => {
    try {
        const res = await request.get('users/search', {
            params: {
                q: key,
                type,
            },
        });

        return res.data
    } catch (error) {
        console.log(error);
    }
};
