import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {
    Row,
    ListGroup,
    ListGroupItem
} from "reactstrap";

export default ({ data: { allUserUser: { edges: user } }, pageContext: { articleId: img } }) => 
    {
        user = user[0].node
        
        let relationships = user.relationships
        let articleLinks = [];
        if (relationships && relationships.node__article !== null) {
            let rel = relationships.node__article;
            for (let i = 0; i < rel.length; i += 2) {
                articleLinks.push(
                    <ListGroupItem key={i}>
                        <Link to={`/article/${rel[i].id}`}>
                            {rel[i].title}
                        </Link>
                        <br />
                    </ListGroupItem>
                );
            }
        }


            return (
                <Layout>
                    <SEO title="People" />
                        <div className="card mb-3" style={{maxWidth: "540px"}}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="https://picsum.photos/id/299/200/200" className="card-img" alt={user.name} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name}</h5>
                                        <p className="card-text">This is a user</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <hr classNameName="my-2" />
                    <Row>
                        <div>Articles: </div>
                        <ListGroup>
                            {articleLinks}
                        </ListGroup>
                    </Row>
                    <br />
                    <Link to="/">Go back to the homepage</Link>
                </Layout>
            );
    };

    // we can query the needed category according to the id passed in the
    // context property of createPage() in gatsby-node.js
    export const query = graphql`
    query($id: String!) {
        allUserUser(filter: { id: { eq: $id } }) {
            edges {
            node {
                name
                id
                relationships {
                    node__article {
                        title
                        id
                    }
                }
            }
            }
        }
    }
`;
