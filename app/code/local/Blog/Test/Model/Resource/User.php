<?php

class Blog_Test_Model_Resource_User extends Mage_Core_Model_Mysql4_Abstract {

    protected function _construct() {
        //инициализация таблицы
        $this->_init('blog_test/table_users', 'id');
    }
}
