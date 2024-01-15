exports.validateNewsPost = (newsPostData) => {
    const errors = {};
    if (!newsPostData.title) {
        errors.title = 'Title is required';
    }
    if (!newsPostData.content) {
        errors.content = 'Content is required';
    }
    return errors;

    

    };