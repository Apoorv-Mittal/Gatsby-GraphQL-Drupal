import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row
} from "reactstrap";
import Equalizer from "react-equalizer";
import { graphql } from "gatsby";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.pages = props.data.allNodeArticle.edges;
    this.pages = this.pages.map((page, index) => {
      let node = page.node;
      let img = this.props.data.allImageSharp.edges.filter(
        i => i.node.parent.id === node.relationships.field_image.localFile.id
      );

      return { article: node, image: img };
    });
  }

  render() {
    const pages = this.pages;

    const HeroTitle = () => (
      <div className="col-12 col-lg-8 left">
        {pages.slice(0, 1).map((page, index) => {
          let node = page.article;
          let img = page.image;
          return (
            <Card className="feature" key={index}>
              {img.map((hero, index) => (
                <div className="card-img-wrapper" key={index}>
                  <Link to={`/article/${node.id}`} >
                    <CardImg
                      top
                      width="100%"
                      src={hero.node.original.src}
                      alt="image"
                    />
                  </Link>
                </div>
              ))}

              <CardBody>
                <CardTitle>
                  <Link
                    className="body-color"
                    to={`/article/${node.id}`}
                  >
                    {node.title}
                  </Link>
                </CardTitle>
                <hr />
                <CardText>{node.subtitle}</CardText>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );

    const SplitRight = () => (
      <div className="col-12 col-lg-4 right">
        {pages.slice(1, 3).map((page, index) => {
          let node = page.article;
          let img = page.image;
          return (
            <Card className="w-100" key={index}>
              {img.map((hero, index) => (
                <div className="card-img-wrapper" key={index}>
                  <Link to={`/article/${node.id}`} >
                    <CardImg
                      top
                      width="100%"
                      src={hero.node.original.src}
                      alt="image"
                    />
                  </Link>
                </div>
              ))}

              <CardBody>
                <CardTitle>
                  <Link
                    className="body-color"
                    to={`/article/${node.id}`}
                  >
                    {node.title}
                  </Link>
                </CardTitle>
                <hr />
                <CardText>{node.subtitle}</CardText>
              </CardBody>
            </Card>
          );
        })}
      </div>
    );

    const PageTitles = () => {
      const grids = pages.slice(3, pages.length).map((page, index) => {
        let node = page.article;
        let img = page.image;
        return (
          <div
            className="col-sm-6 col-md-6 col-lg-3 d-flex align-items-stretch"
            key={index}
          >
            <Card className="w-100">
              <Link
                to={`/article/${node.id}`}
                key={Math.random()}
                className="home-link track-click"
              >
                <div className="card-img-wrapper" key={index}>
                  <CardImg top width="100%" src={img[0].node.original.src} />
                </div>
                <CardBody>
                  <CardTitle>{node.title}</CardTitle>
                </CardBody>
              </Link>
            </Card>
          </div>
        );
      });
      return <Row>{grids}</Row>;
    };
    return (
      <Layout>
        <Container className="split2row">
          <div>
            <Row>
              <Equalizer>
                <HeroTitle />
                <SplitRight />
              </Equalizer>
            </Row>
          </div>
          <PageTitles />
        </Container>
      </Layout>
    );
  }
}
export default IndexPage;

export const query = graphql`
  query pageQuery {
    allNodeArticle {
      edges {
        node {
          title
          id
          relationships {
            field_image {
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
            src
          }
          parent {
            id
          }
        }
      }
    }
  }
`;
