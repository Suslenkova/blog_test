<?php

class Blog_Test_Block_List extends Mage_Core_Block_Template {

//Блоки работают с моделями, берут из них данные

    public function getAllPosts() {
        $posts = Mage::getModel('blog_test/test')->getCollection()->getData();
        $jsonData = Mage::helper('core')->jsonEncode($posts);
        return $jsonData;
    }

    public function getPostById($id) {
        if ($id && $id > 0) {
            $post = Mage::getModel('blog_test/test')->load($id);
            $jsonData = Mage::helper('core')->jsonEncode($post);
            return $jsonData;
        }
    }

    public function deletePost($id) {
        if ($id && $id > 0) {
            $post = Mage::getModel('blog_test/test')->load($id)->delete();
        }
    }

    public function deletePosts($ids) {
        if (is_array($ids) && sizeof($ids) > 0) {
            foreach ($ids as $id) {
                Mage::getModel('blog_test/test')->load($id)->delete();
            }
        }
    }

    public function savePost($data) {
        if (!empty($data)) {
            $model = Mage::getModel('blog_test/test');

            $model->setCreated(now());
            $model->addData($data);
            $model->save();
        }
    }

    public function updatePost($id, $data) {
        if ($id && $id > 0) {
            if (!empty($data)) {
                Mage::getModel('blog_test/test')->load($id)->setData($data)->setId($id)->save();
            }
        }
    }

    public function format() {
        $format = Mage::app()->getLocale()->getDateFormat(Mage_Core_Model_Locale::FORMAT_TYPE_SHORT);
        return $format;
    }

    public function getPathToSkin() {
        $base_url = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_SKIN);
        return $base_url;
    }

    public function isUserCredentials($data) {
        if (empty($data['name']) && empty($data['password'])) {
            return;
        }
        $model = Mage::getModel('blog_test/user');
        $result = $model->login($data['name'], $data['password']); //Blog_Test_Model_User
        $result = array("authenticated" => $result);
        // var_dump($result);
        $jsonData = Mage::helper('core')->jsonEncode($result); //
        return $jsonData;
    }

    public function userRegistry($data) {
        if (empty($data['name']) && empty($data['password']) && empty($data['email'])) {
            return;
        }
        $model = Mage::getModel('blog_test/user');
        //в $result  - модель добавленного юзера
        $result = $model->registry($data);
        $result = array("name" => $result['name']);
        $jsonData = Mage::helper('core')->jsonEncode($result); //TODO: jsonEncode($authUser)
        return $jsonData;
    }

}
