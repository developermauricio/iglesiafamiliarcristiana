<?php

namespace MailPoetVendor\Egulias\EmailValidator\Exception;

if (!defined('ABSPATH')) exit;


class ConsecutiveDot extends \MailPoetVendor\Egulias\EmailValidator\Exception\InvalidEmail
{
    const CODE = 132;
    const REASON = "Consecutive DOT";
}
