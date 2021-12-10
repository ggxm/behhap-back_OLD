/* 
Definition
*/
    const Mandatory = {
        register: [ 'givenName', 'familyName', 'password', 'email' ],
        login: [ 'password', 'email' ],
        post: [ 'headline', 'body' ],
        category: [ 'name', 'isPublished' ],
        tag: [ 'name', 'category', 'isPublished' ],
        tool: [ 'name', 'description', 'url', 'categories', 'tags', 'isPublished' ]
    } 
//

/* 
Export
*/ 
    module.exports = Mandatory;
//