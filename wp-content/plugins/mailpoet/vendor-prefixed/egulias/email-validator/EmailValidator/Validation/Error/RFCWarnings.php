<?php

namespace MailPoetVendor\Egulias\EmailValidator\Validation\Error;

if (!defined('ABSPATH')) exit;


use MailPoetVendor\Egulias\EmailValidator\Exception\InvalidEmail;
class RFCWarnings extends \MailPoetVendor\Egulias\EmailValidator\Exception\InvalidEmail
{
    const CODE = 997;
    const REASON = 'Warnings were found.';
}
