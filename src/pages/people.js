import React from "react";
import { graphql } from "gatsby";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap";

export default class People extends React.Component {
  render() {
    let userData = this.props.data.allUserUser.edges;
    let articleData = this.props.data.allNodeArticle.edges;

    return (
      <Layout>
        <SEO title="People" />
        <Row>
          {userData
            .filter(user => user.node.relationships != null)
            .map((user, index) => {
              let relationships = user.node.relationships.node__article;
              let articleLinks = [];
              if (relationships) {
                for (let i = 0; i < relationships.length; i += 2) {
                  let art = articleData.filter(
                    element => element.node.title === relationships[i].title
                  );
                  articleLinks.push(
                    <ListGroupItem key={i}>
                      <Link
                        to={`/article/${art[0].node.id}`}
                      >
                        {relationships[i].title}
                      </Link>
                      <br />
                    </ListGroupItem>
                  );
                }
              }

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
                        <CardTitle>{user.node.name}</CardTitle>
                        <CardText>Articles: <ListGroup>{articleLinks}</ListGroup></CardText>
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
          relationships {
            node__article {
              title
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
