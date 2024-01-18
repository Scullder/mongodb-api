<?php

namespace App\Filters;

use Illuminate\Http\Request;

class Filter
{
    protected $allowedColumns = [];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];

    public function transform(Request $request) 
    {
        $eloquentQuery = [];

        foreach ($this->allowedColumns as $column => $operators) {
            if (!$query = $request->query($column)) {
                continue;
            }

            foreach ($operators as $operator) {
                if(isset($query[$operator])) {
                    $eloquentQuery[] = [$column, $this->operatorMap[$operator], $query[$operator]];
                }
            }
        }

        return $eloquentQuery;
    }
}
