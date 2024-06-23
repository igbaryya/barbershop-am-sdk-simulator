export const createActionTypes = (types) => {
    const replace = (a, b) => {
        a[b] = b;
        return a;
    };
    return types.reduce(replace, {});
};
