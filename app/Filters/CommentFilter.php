<?php

namespace App\Filters;

use App\Filters\Filter;

class CommentFIlter extends Filter
{
    protected $allowedColumns = [
        'authorId' => ['eq'],
        'postId' => ['eq'],
    ];
}