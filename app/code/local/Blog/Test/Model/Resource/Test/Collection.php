<?php

class Blog_Test_Model_Resource_Test_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract {

    protected function _construct() {
        parent::_construct();
        $this->_init('blog_test/test');
    }

}
