"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSharedWorker = void 0;
/**
 * Loads the shared worker. The banana sdk calls this as part of it's factory function.
 */
async function createSharedWorker() {
    if (typeof window.SharedWorker === 'undefined') {
        throw new Error('SharedWorker is not supported.');
    }
    const version = (process.env.NODE_ENV === 'production' && process.env.COMMIT_TAG) || '';
    const src = `./shared_worker${version ? `.${version}` : ''}.js`;
    const name = `Aztec core sdk${version ? ` ${version}` : ''}`;
    return new SharedWorker(src, { name, credentials: 'same-origin' });
}
exports.createSharedWorker = createSharedWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3NoYXJlZF93b3JrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZV9zZGtfZmxhdm91cnMvY2hvY29sYXRlX2NvcmVfc2RrL2NyZWF0ZV9zaGFyZWRfd29ya2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0ksS0FBSyxVQUFVLGtCQUFrQjtJQUN0QyxJQUFJLE9BQU8sTUFBTSxDQUFDLFlBQVksS0FBSyxXQUFXLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEYsTUFBTSxHQUFHLEdBQUcsa0JBQWtCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUM7SUFDaEUsTUFBTSxJQUFJLEdBQUcsaUJBQWlCLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDN0QsT0FBTyxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUM7QUFDckUsQ0FBQztBQVRELGdEQVNDIn0=