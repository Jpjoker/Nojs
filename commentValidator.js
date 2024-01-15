exports.validateComment = (commentData) => {
    const errors = [];
    if (!commentData.postId || commentData.postId.trim() === '') {
        errors.push('Post ID is required.');
    }
    if (!commentData.content || commentData.content.trim() === '') {
        errors.push('Content is required.');
    }

    return errors.length > 0 
        ? { error: { details: errors } }
        : null;
};