<?php

namespace MailPoetVendor\Egulias\EmailValidator\Warning;

if (!defined('ABSPATH')) exit;


class LabelTooLong extends \MailPoetVendor\Egulias\EmailValidator\Warning\Warning
{
    const CODE = 63;
    public function __construct()
    {
        $this->message = 'Label too long';
        $this->rfcNumber = 5322;
    }
}
