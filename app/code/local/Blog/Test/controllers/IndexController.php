<?php

class Blog_Test_IndexController extends Mage_Core_Controller_Front_Action {
    public function indexAction() {
        $this->_redirect('blog/test/edit');
    }
}

