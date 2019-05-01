import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Row,
  Col
} from "reactstrap";

export default class People extends React.Component {
  render() {
    let userData = this.props.data.allUserUser.edges;

    return (
      <Layout>
        <SEO title="People" />
        <Row>
          {userData
            .filter(user => user.node.relationships != null)
            .map((user, index) => {

              return (
                <div key={index} style={{width: "25%"}}>
                  <Col>
                    <Card>
                      <CardImg
                        top
                        src="https://picsum.photos/id/299/200/200"
                        alt="Card image cap"
                      />
                      <CardBody>
                        <CardTitle>
                          <Link to={`/people/${user.node.id}`} >
                            {user.node.name}
                          </Link>
                        </CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                </div>
              );
            })}
        </Row>
        <br />
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}

export const query = graphql`
  query peopleQuery {
    allUserUser {
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
    allNodeArticle {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
