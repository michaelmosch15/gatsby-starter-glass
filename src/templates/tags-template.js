import React from 'react';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import styled from 'styled-components';

const TagsTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout title={`Posts tagged "${tag}"`}>
      <TagsTemplateWrapper>
        <Title>{`Posts tagged "${tag}" (${totalCount})`}</Title>
        <PostList posts={posts} />
        <TagList>
          {posts.map(({ frontmatter }, index) => (
            <TagItem key={index}>
              {frontmatter.tags.map(staticTag => (
                <TagText key={staticTag}>{staticTag}</TagText>
              ))}
            </TagItem>
          ))}
        </TagList>
      </TagsTemplateWrapper>
    </Layout>
  );
};

export default TagsTemplate;

const TagsTemplateWrapper = styled.div`
  padding-top: var(--size-900);
`;

const Title = styled.h1`
  font-size: var(--size-700);
`;

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const TagItem = styled.li`
  margin-bottom: 1rem;
`;

const TagText = styled.span`
  margin-right: 5px;
  padding: 0.2rem 0.6rem;
  background-color: #ddd;
  border-radius: 3px;
  font-size: var(--size-300);
`;
