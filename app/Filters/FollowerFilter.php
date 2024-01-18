<?php

namespace App\Filters;

use App\Filters\Filter;

class FollowerFilter extends Filter
{
    protected $allowedColumns = [
        'userId' => ['eq'],
        'followedUserId' => ['eq'],
    ];
}