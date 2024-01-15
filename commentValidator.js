exports.validateComment = (commentData) => {
    const errors = {};
    if (!commentData.title) {
        errors.title = 'Title is required';
    }
    if (!commentData.content) {
        errors.content = 'Content is required';
    }
    return errors;
};