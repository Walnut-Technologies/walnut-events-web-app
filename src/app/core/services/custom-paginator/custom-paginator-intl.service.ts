import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Mostrar por página';

    override getRangeLabel = function (page: number, pageSize: number, length: number): string {
        const of = 'de';
        if (length === 0 || pageSize === 0) { return `0 ${of} ${length}`; }

        length = Math.max(length, 0);

        const startIndex = page * pageSize;

        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        return `${startIndex + 1}-${endIndex} ${of} ${length}`;
    };
}
