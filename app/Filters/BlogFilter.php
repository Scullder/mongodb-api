<?php

namespace App\Filters;

use App\Filters\Filter;

class BlogFilter extends Filter
{
    protected $allowedColumns = [
        'authorId' => ['eq'],
        'isPublic' => ['eq'],
    ];
}