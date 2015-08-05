<?php

$installer = $this;

$tablePosts = $installer->getTable('blog_test/table_posts');
$tableUsers = $installer->getTable('blog_test/table_users');

$installer->startSetup();

//-----Posts table---
$installer->getConnection()->dropTable($tablePosts);
$table1 = $installer->getConnection()->newTable($tablePosts)->
        addColumn(
                'id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, array(
            'unsigned' => true,
            'identity' => true, //auto_increment
            'nullable' => false,
            'primary' => true
                )
        )->
        addColumn(
                'title', Varien_Db_Ddl_Table::TYPE_VARCHAR, 255, array(
            'nullable' => false
                )
        )->
        addColumn(
                'description', Varien_Db_Ddl_Table::TYPE_TEXT, null, array(
            'nullable' => false
                )
        )->
        addColumn(
                'created', Varien_Db_Ddl_Table::TYPE_DATETIME, null, array(
            'nullable' => false
                )
        )->
        setComment('Posts table');

$installer->getConnection()->createTable($table1);

//-----Users table---
$installer->getConnection()->dropTable($tableUsers);

$table2 = $installer->getConnection()->newTable($tableUsers)->
        addColumn(
            'id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, array(
            'unsigned' => true,
            'identity' => true,
            'nullable' => false,
            'primary' => true
                )
        )->
        addColumn(
            'name', Varien_Db_Ddl_Table::TYPE_VARCHAR, 50, array(
            'nullable' => false
                )
        )->
        addColumn(
            'password', Varien_Db_Ddl_Table::TYPE_VARCHAR, 100, array(
            'nullable' => false
                )
        )->
        addColumn(
            'email', Varien_Db_Ddl_Table::TYPE_VARCHAR, 255, array(
            'nullable' => false
                )
        )->
        setComment('Users table');

$installer->getConnection()->createTable($table2);

$installer->endSetup();