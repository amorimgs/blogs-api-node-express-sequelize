module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      field: 'post_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'blog_posts',
        key: 'id'
      }
    },
    categoryId: {
      field: 'category_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'post_categories',
    underscored: true,
    timestamps: false,
  })

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'PostId',
      otherKey: 'CategoryId',
      as: 'categories'
    })

    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'CategoryId',
      otherKey: 'PostId',
      as: 'blog_posts'
    })
  }

  return PostCategory;
}