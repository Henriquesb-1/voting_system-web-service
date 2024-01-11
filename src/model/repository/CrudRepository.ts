export default interface CrudRepository<T> {
    get(page: number): T[];
    save(entity: T): T;
    update(entity: T): T;
    delete(entity: T): T;
}