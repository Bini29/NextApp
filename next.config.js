module.exports = {
  async rewrites() {
    return [
      {
        source: "/install:slug",
        destination: "/install/:slug",
      },
    ];
  },
};
