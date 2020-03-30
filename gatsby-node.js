//require the path module
const path = require('path');
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query {
      tours: allContentfulTour {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  data.tours.edges.forEach(({ node }) => {
    createPage({
      path: `tours/${node.slug}`,
      component: path.resolve('./src/templates/tour-template.js'),
      //   i think resolve in node just means 'find'
      context: {
        slug: node.slug
      }
    });
  });
};
