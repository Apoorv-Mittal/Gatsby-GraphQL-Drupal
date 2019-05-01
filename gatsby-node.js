/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`); // you will need it later to point at your template component

exports.createPages = ({
    graphql,
    actions
}) => {
    const {
        createPage
    } = actions;

    // we use a Promise to make sure the data are loaded
    // before attempting to create the pages with them
    return new Promise((resolve, reject) => {
        // fetch your data here, generally with graphQL.
        // for example, let say you use your data from Contentful using its associated source plugin
    graphql(`
        {
        allNodeArticle {
            edges {
                node {
                    title
                    id
                    body {
                        value
                        processed
                    }
                    relationships {
                        field_image {
                        id
                            localFile {
                                id
                            }
                        }
                    }
                }
            }
        }
        allImageSharp {
            edges {
                node {
                    original {
                        width
                        height
                        src
                    }
                    id
                    internal {
                        contentDigest
                        type
                        owner
                    }
                    parent {
                        id
                    }                    
                }
            }
        }
    }
    `).then(result => {
            // first check if there is no errors
            if (result.errors) {
                // reject Promise if error
                reject(result.errors);
            }

            // if no errors, you can map into the data and create your static pages
            result.data.allNodeArticle.edges.forEach(({
                node
            }) => {
                // Making a image 
                let img = result.data.allImageSharp.edges.find(
                    i => i.node.parent.id === node.relationships.field_image.localFile.id
                );

                // create page according to the fetched data
                createPage({
                    path: `/article/${node.id}`, // your url -> /categories/animals
                    component: path.resolve("./src/templates/article.js"), // your template component
                    context: {
                        // optional,
                        // data here will be passed as props to the component `this.props.pageContext`,
                        // as well as to the graphql query as graphql arguments.
                        id: node.id,
                        imageId: img.node.original.src
                    }
                });
            });

            resolve();
        });
    });
};