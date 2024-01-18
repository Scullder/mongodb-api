<?php

namespace App\Filters;

use App\Filters\Filter;

class PostFIlter extends Filter
{
    protected $allowedColumns = [
        'authorId' => ['eq'],
    ];
}