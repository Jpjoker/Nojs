exports.validateNewsPost = (newsPostData) => {
    const errors = [];
    if (!newsPostData.title || newsPostData.title.trim() === '') {
        errors.push('Title is required.');
    }
    if (!newsPostData.content || newsPostData.content.trim() === '') {
        errors.push('Content is required.');
    }

    return errors.length > 0 
        ? { error: { details: errors } }
        : null;
    

    };