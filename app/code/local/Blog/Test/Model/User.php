<?php

class Blog_Test_Model_User extends Mage_Core_Model_Abstract {

    const HASH_SALT_LENGTH = 32;

    protected function _construct() {
        parent::_construct();
        $this->_init('blog_test/user');
    }

    //Authenticate 
    public function authenticate($name, $password) {
        $result = false;
        $model = $this->load($name, 'name');
        if ($model) {
            if (Mage::helper('core')->validateHash($password, $model->getPassword())) {
                $result = true;
            } else {
                $result = false;
            }
        } else {
            $result = false;
        }
        return $result; //bool
    }

    // Login 
    public function login($name, $password) {
        if ($res = $this->authenticate($name, $password)) {
            return $res;
        }
    }

    //Registry 
    public function registry($data) {
        if ($data['name'] && $data['password'] && $data['email']) {
            $data['password'] = $this->_encryptPassword($data['password']);
            $this->addData($data);
            $this->save();
            return $this; //return  Blog_Test_Model_User
        }
    }

    protected function _encryptPassword($pw) {
        return Mage::helper('core')->getHash($pw, Blog_Test_Model_User::HASH_SALT_LENGTH);
    }

    public function getHelper() {
        return Mage::helper('blog_test');
    }

    public function getCollection() {
        return Mage::getResourceModel('blog_test/user_collection');
    }

}
