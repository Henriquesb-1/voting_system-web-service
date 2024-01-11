export default interface CrudRepository<T> {
    get(page: number): {data: T[], pages: number, total: number};
    save(entity: T): T;
    update(entity: T): T;
    delete(entity: T): T;
}