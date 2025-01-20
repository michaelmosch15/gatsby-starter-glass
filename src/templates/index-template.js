import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import styled from 'styled-components';
import bioProxalImage from '../images/BioProxal_logo_and_name_dark.png';
import iconImage from '../images/icon.png'; // Import the PNG image

const HomePage = ({ data }) => {
  // Extract posts, intro text, and title from data
  const posts = data.allMarkdownRemark.nodes;
  const intro = data.markdownRemark.html;
  const title = data.markdownRemark.frontmatter.title;

  return (
    <Layout title={title}>
      {/* Render the top icon image */}
      <TopIconImage src={iconImage} alt="Top Icon" />

      {/* Render intro section using HTML content */}
 <div></div>

      {/* Render the list of posts */}
      <PostList posts={posts} />
      
      {/* Render the image as a link to the /blog page */}
      <Link to="/blog">
        <AllPostsImage src={bioProxalImage} alt="View All Posts" />
      </Link>
    </Layout>
  );
};

export default HomePage;

// Styled component for the top icon image
const TopIconImage = styled.img`
  display: block;
  margin-top: var(--size-600);
  margin-left: auto;
  margin-right: auto;
  width: 75px; // Adjust the size as needed
  height: auto; // Maintain aspect ratio
`;

// Styled component for the bottom image
const AllPostsImage = styled.img`
  display: block;
  margin-top: var(--size-800);
  margin-bottom: var(--size-800);
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  height: auto;
  cursor: pointer;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--size-800);
  margin-bottom: var(--size-900);
  text-align: center;

  & p {
    text-transform: capitalize;
    font-size: var(--size-400);
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 9
    ) {
      nodes {
        fields {
          slug
        }
        excerpt
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          title
          tags
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;