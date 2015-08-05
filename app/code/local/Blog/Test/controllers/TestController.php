<?php

class Blog_Test_TestController extends Mage_Core_Controller_Front_Action {

    public function indexAction() {
        $this->_forward('edit');
    }

    public function editAction() {
        $this->_title()->_title('Edit')->_title('Test')->_title('Blog');
        $this->loadLayout();
        $this->renderLayout();
    }

    public function allAction() {
        $posts = $this->loadLayout()->getLayout()->getBlock('blog.list')->getAllPosts();
        $this->getResponse()->setHeader('Content-type', 'application/json');
        $this->getResponse()->setBody($posts);
    }

    public function getAction() {
        if ($id = $this->getRequest()->getParam('id')) {
            $post = $this->loadLayout()->getLayout()->getBlock('blog.list')->getPostById($id);
            $this->getResponse()->setHeader('Content-type', 'application/json');
            $this->getResponse()->setBody($post);
        }
    }

    public function addAction() {
        if ($data = $this->getRequest()->getPost()) {
            //$data = Mage::helper('core')->jsonDecode($jsonData);
            $this->loadLayout()->getLayout()->getBlock('blog.list')->savePost($data);
        } else {
            $this->getResponse()->setHeader('Post data', 'error');
        }
    }

    public function updateAction() {
        $id = $this->getRequest()->getParam('id');
        if ($data = $this->getRequest()->getPost()) {
            // $data = Mage::helper('core')->jsonDecode($jsonData);
            $this->loadLayout()->getLayout()->getBlock('blog.list')->updatePost($id, $data);
        } else {
            $this->getResponse()->setHeader('Post data', 'error');
        }
    }

    public function deleteAction() {
        if ($id = (int) $this->getRequest()->getParam('id')) {
            $this->loadLayout()->getLayout()->getBlock('blog.list')->deletePost($id);
        }
    }

    public function massdelAction() {
        if ($idStr = $this->getRequest()->getParam('id')) {
            $ids = explode(",", $idStr);
            $this->loadLayout()->getLayout()->getBlock('blog.list')->deletePosts($ids);
        }
    }

    public function loginAction() {
        if ($data = $this->getRequest()->getPost()) {

            $result = $this->loadLayout()->getLayout()->getBlock('blog.list')->isUserCredentials($data);
            if ($result) {
                $this->getResponse()->setHeader('Content-type', 'application/json');
                $this->getResponse()->setHeader('Response', $result);
                $this->getResponse()->setBody($result);
            } else{
                 $this->getResponse()->setHeader('Response', 'Model is not work');
            }
        } else {
            $this->getResponse()->setHeader('Request', 'error');
        }
    }

    public function registryAction() {
        if ($data = $this->getRequest()->getPost()) {

            $result = $this->loadLayout()->getLayout()->getBlock('blog.list')->userRegistry($data);

            if ($result) {
                $this->getResponse()->setHeader('Content-type', 'application/json');
                $this->getResponse()->setHeader('Response', $result);
                $this->getResponse()->setBody($result);
            } else {
                $this->getResponse()->setHeader('Response', 'Model is not work');
            }
        } else {
            $this->getResponse()->setHeader('Request', 'error');
        }
    }

}
