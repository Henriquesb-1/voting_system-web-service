export default interface CrudRepository<T> {
    get(page: number, param?: any): Promise<{data: T[], pages: number, total: number}>;
    save(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    delete(entity: T): Promise<T>;
}