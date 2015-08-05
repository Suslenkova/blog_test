# blog_test
This is test blog.
During installation of the module, in the DB automatically creating two tables: blog_test_posts and blog_test_users.
Applcation incorporates basic CRUD operations for the posts records; user authorization and user registration.
This application is available at http://magentostore.com/blog/test/edit. Only for registered and authorized users.

Installation:

1. Upload 'blog' folder in to magento root directory
2. Set the theme module (in Admin Panel): System->Confguration->Design. Package->Current package name =  blog
Themes->default = test
4.Refresh magento cache
5. Load browser (http://[store.com]/blog/test/edit). Make sure of appropriate database updates.